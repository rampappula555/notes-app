import { Component } from "react";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }
  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>somethig has error</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
