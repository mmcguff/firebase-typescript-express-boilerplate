
const testConnection = () => console.log("...connection test successful");

const getGreeting = (name:string) => {
  return `Hello ${name}`;
};

export const utils = {
  testConnection,
  getGreeting,
};
