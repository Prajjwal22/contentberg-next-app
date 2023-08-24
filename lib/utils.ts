export const dateFormatter = (date: Date) => {
  let newDate = new Date(date);
  let day = newDate.getDay();
  let month = newDate.toLocaleString("en-US", { month: "short" });
  let year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
};

export const getReadingTime = (content: string) => {
    let words = content?.split(" ").length;
    let readingSpeed = 300
    let readingTime  = words / readingSpeed;

    return Math.floor(readingTime)
};
