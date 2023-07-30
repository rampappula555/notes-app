import { useRef, forwardRef, useImperativeHandle } from "react";

function Child(props, ref) {
  const input1Ref = useRef();
  const input2Ref = useRef();

  const input3Ref = useRef();
  function childFunc() {
    console.log("child called");
  }
  useImperativeHandle(
    ref,
    () => ({
      input1Ref,
      childFunc,
      input2Ref: () => input2Ref.current.focus,
      input3Ref: () => input3Ref.current.focus(),
    }),
    []
  );
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input ref={input1Ref} />
      <input ref={input2Ref} />
      <input ref={input3Ref} />
    </div>
  );
}
export default forwardRef(Child);
