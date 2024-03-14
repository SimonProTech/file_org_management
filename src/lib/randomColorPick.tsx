const randomColorPick = (): string => {
  const randomColors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-violet-500', 'bg-indigo-500', 'bg-cyan-500'];
  const number = Math.floor(Math.random() * randomColors.length);
  return randomColors[number];
};

export default randomColorPick;
