import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import "./App.css";

import Table from "./Components/Table/Table";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const statusList = ["In progress", "Backlog", "Todo", "Done", "Cancelled"];
  const userList = [
    "Anoop sharma",
    "Yogesh",
    "Shankar Kumar",
    "Ramesh",
    "Suresh",
  ];
  const priorityList = [
    { name: "No priority", priority: 0 },
    { name: "Low", priority: 1 },
    { name: "Medium", priority: 2 },
    { name: "High", priority: 3 },
    { name: "Urgent", priority: 4 },
  ];

  const [groupValue, setGroupValue] = useState(
    getStateFromLocalStorage() || "status"
  );
  const [orderValue, setOrderValue] = useState("title");
  const [ticketDetails, setTicketDetails] = useState([]);

  const orderDataByValue = useCallback(
    async (cardsArray) => {
      if (orderValue === "priority") {
        cardsArray.sort((a, b) => b.priority - a.priority);
      } else if (orderValue === "title") {
        cardsArray.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          } else if (titleA > titleB) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      await setTicketDetails(cardsArray);
    },
    [orderValue, setTicketDetails]
  );

  function saveStateToLocalStorage(state) {
    localStorage.setItem("groupValue", JSON.stringify(state));
  }

  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem("groupValue");
    return storedState ? JSON.parse(storedState) : null;
  }

  useEffect(() => {
    saveStateToLocalStorage(groupValue);

    async function fetchData() {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      await refactorData(response);
    }

    async function refactorData(response) {
      let ticketArray = [];

      if (response.status === 200) {
        for (let i = 0; i < response.data.tickets.length; i++) {
          for (let j = 0; j < response.data.users.length; j++) {
            if (response.data.tickets[i].userId === response.data.users[j].id) {
              let ticketJson = {
                ...response.data.tickets[i],
                userObj: response.data.users[j],
              };
              ticketArray.push(ticketJson);
            }
          }
        }
      }

      await setTicketDetails(ticketArray);
      orderDataByValue(ticketArray);
    }

    fetchData();
  }, [orderDataByValue, groupValue]);

  function handleGroupValue(value) {
    setGroupValue(value);
    console.log(value);
  }

  function handleOrderValue(value) {
    setOrderValue(value);
    console.log(value);
  }

  return (
    <>
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <div className="board">
        <div className="board-details-list">
          {
            {
              status: (
                <>
                  {statusList.map((listItem) => (
                    <Table
                      key={listItem}
                      groupValue="status"
                      orderValue={orderValue}
                      listTitle={listItem}
                      listIcon=""
                      statusList={statusList}
                      ticketDetails={ticketDetails}
                    />
                  ))}
                </>
              ),
              user: (
                <>
                  {userList.map((listItem) => (
                    <Table
                      key={listItem}
                      groupValue="user"
                      orderValue={orderValue}
                      listTitle={listItem}
                      listIcon=""
                      userList={userList}
                      ticketDetails={ticketDetails}
                    />
                  ))}
                </>
              ),
              priority: (
                <>
                  {priorityList.map((listItem) => (
                    <Table
                      key={listItem.priority}
                      groupValue="priority"
                      orderValue={orderValue}
                      listTitle={listItem.priority}
                      listIcon=""
                      priorityList={priorityList}
                      ticketDetails={ticketDetails}
                    />
                  ))}
                </>
              ),
            }[groupValue]
          }
        </div>
      </div>
    </>
  );
}

export default App;
