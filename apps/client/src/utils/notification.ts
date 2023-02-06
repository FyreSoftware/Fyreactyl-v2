export function createNotificationConfig(
  type: "success" | "error",
  title: string,
  description: string
) {
  if (type === "success") {
    return {
      id: "hello-there",
      autoClose: 5000,
      title: title,
      message: description,
      color: "green",
      loading: false,
    };
  } else if (type === "error") {
    return {
      id: "hello-there",
      autoClose: 5000,
      title: title,
      message: description,
      color: "red",
      loading: false,
    };
  }
  return {
    id: "hello-there",
    autoClose: 5000,
    title: title,
    message: description,
    color: "gray",
  };
}
