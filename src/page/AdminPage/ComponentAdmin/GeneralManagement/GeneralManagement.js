import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import format from "date-format";

import * as UserService from "../../../../Service/UserService";
import * as TodoService from "../../../../Service/TodoService";
import { useMutationHook } from "../../../../Hook/useMutationHook";
import CountInfo from "./InfoComponent/CountInfo";
import "./GeneralManagement.scss";
import MyChart from "../../../../component/Chart/MyChart";
import LoadingComponent from "../../../../component/LoadingComponent/LoadingComponent";
function GeneralManagement() {
  let user = useSelector((state) => state.user);
  let [isLoading, setIsLoading] = useState(false);
  let [dataGeneral, setDataGeneral] = useState([]);
  let [timeTodo, setTimeTodo] = useState([]);

  // const data = {
  //   labels: [
  //     "Tháng 1",
  //     "Tháng 2",
  //     "Tháng 3",
  //     "Tháng 4",
  //     "Tháng 5",
  //     "Tháng 6",
  //     "Tháng 7",
  //     "Tháng 8",
  //     "Tháng 9",
  //     "Tháng 10",
  //     "Tháng 11",
  //     "Tháng 12",
  //   ],
  //   datasets: [
  //     {
  //       label: "Số lượng công việc",
  //       data: [100, 150, 200, 250, 300, 280, 320, 350, 310, 290, 250, 220],
  //       backgroundColor: "#ff0000",
  //     },
  //   ],
  // };
  // call APis
  let mutationUser = useMutationHook((data) => UserService.getCountUser(data));
  let mutationTodo = useMutationHook((data) => TodoService.getCountTodo(data));
  let dataUser = mutationUser.data;
  let dataTodo = mutationTodo.data;
  //function
  const handleGetCount = async () => {
    setIsLoading(true);
    await mutationUser.mutate({
      email: user && user?.email,
      token: user && user?.access_token,
    });
    await mutationTodo.mutate({
      email: user && user?.email,
      token: user && user?.access_token,
    });
  };
  //useEffect
  useEffect(() => {
    handleGetCount();
  }, []);
  useEffect(() => {
    // user
    if (dataUser && dataUser?.status === "OK") {
      setDataGeneral((prevData) => [
        ...prevData,
        {
          title: dataUser?.title,
          count: dataUser?.countUser,
        },
      ]);
      setIsLoading(false);
    }
    if (dataUser && dataUser?.status === "ERROR") {
      setDataGeneral((prevData) => [
        ...prevData,
        {
          title: dataUser?.title,
          count: dataUser?.countUser,
        },
      ]);
      setIsLoading(false);
    }
    // todo
    if (dataTodo && dataTodo?.status === "OK") {
      let dateCountMap = {};
      dataTodo?.listTodo.forEach((item) => {
        let formattedDate = format("dd/MM/yyyy", new Date(item?.createdAt));

        if (dateCountMap[formattedDate]) {
          dateCountMap[formattedDate] += 1;
        } else {
          dateCountMap[formattedDate] = 1;
        }

        const formatData = Object.keys(dateCountMap).map((date) => ({
          date,
          count: dateCountMap[date],
        }));
        setTimeTodo([...timeTodo, formatData]);
        setIsLoading(false);
      });
      // -------------------------------------
      setDataGeneral((prevData) => [
        ...prevData,
        {
          title: dataTodo?.title,
          count: dataTodo?.countTodo,
        },
      ]);
    }
    if (dataTodo && dataTodo?.status === "ERROR") {
      setIsLoading(false);
      setDataGeneral((prevData) => [
        ...prevData,
        {
          title: dataTodo?.title,
          count: dataTodo?.countTodo,
        },
      ]);
    }
  }, [dataTodo, dataUser]);

  return (
    <div className="general-container">
      {isLoading === true && <LoadingComponent />}
      <div className="container">
        <div className="row">
          <div className="count-info-container">
            {dataGeneral &&
              dataGeneral.length > 0 &&
              dataGeneral
                .filter((item, index, self) => self.findIndex((otherItem) => otherItem.title === item.title) === index)
                .map((item, index) => (
                  <div key={index}>
                    <CountInfo data={item} />
                  </div>
                ))}
          </div>
          <div className="chart-container">
            <MyChart data={timeTodo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralManagement;
