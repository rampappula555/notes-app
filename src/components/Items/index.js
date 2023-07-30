import "./index.css";
import { useParams } from "react-router-dom";
import { Chrono } from "react-chrono";
import Child from "../Item";
import { useRef, useState, useTransition } from "react";

const Items = () => {
  const items = [
    {
      title: "January 2022",
      cardTitle: "Event 1",
      cardSubtitle: "Event 1 Subtitle",
      cardDetailedText: "This is the first event on the timeline.",
    },
    {
      title: "February 2022",
      cardTitle: "Event 2",
      cardSubtitle: "Event 2 Subtitle",
      cardDetailedText: "This is the second event on the timeline.",
    },
    {
      title: "March 2022",
      cardTitle: "Event 3",
      cardSubtitle: "Event 3 Subtitle",
      cardDetailedText: "This is the third event on the timeline.",
    },
  ];
  const { id } = useParams();
  function onClickdiv1(event) {
    event.stopPropagation();

    console.log("div1");
  }
  function onClickdiv2(event) {
    event.stopPropagation();
    console.log("div2");
  }
  function onClickdiv3(event) {
    console.log("div3");
  }
  const mainRef = useRef(null);
  localStorage.setItem("time", JSON.stringify(new Date()));
  const date = JSON.parse(localStorage.getItem("time"));
  console.log(new Date(date) - new Date());
  const [inp, setInp] = useState("");
  const [inp2, setInp2] = useState([]);
  const [isPending, setTransition] = useTransition();
  function onChangeInp(event) {
    setInp(event.target.value);

    setTransition(() => {
      let a = [];
      for (let i = 1; i < 20000; i++) a.push(event.target.value);
      setInp2(a);
    });
  }
  return (
    <div>
      <div>
        <input value={inp} onChange={onChangeInp} />
        <p>{isPending ? "loading..." : inp2.map((each) => <p>{each}</p>)}</p>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Child ref={mainRef} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            onClick={() => {
              mainRef.current.input1Ref.current.focus();
            }}
          >
            button1
          </button>
          <button
            onClick={() => {
              mainRef.current.input2Ref();
            }}
          >
            button2
          </button>

          <button onClick={() => mainRef.current.input3Ref()}>button3</button>

          <button
            onClick={() => {
              mainRef.current.childFunc();
            }}
          >
            button4
          </button>
        </div>
      </div>
      <div>
        <Chrono items={items} mode="HORIZONTAL" itemWidth={150} showSingle />
      </div>
      <h1>user id: {id}</h1>
      <div
        style={{
          height: "100vh",
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClickCapture={onClickdiv1}
      >
        div1
        <div
          style={{
            height: "50vh",
            width: "50vw",
            backgroundColor: "blue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClickCapture={onClickdiv2}
        >
          div2
          <div
            style={{
              height: "25vh",
              width: "25vw",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClickCapture={onClickdiv3}
          >
            div3
          </div>
        </div>
      </div>
    </div>
  );
};
export default Items;
