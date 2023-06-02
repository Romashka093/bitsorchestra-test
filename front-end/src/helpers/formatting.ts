export const formattingDate = (data: string) => {
  const date = new Date(data);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formattedDate;
};

const date = new Date();
export const currentDate = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;
