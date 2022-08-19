export default function toMinutes(seconds){
  if(isNaN(seconds)) return '0:00';

  const minute = Math.floor(seconds / 60);

  let second = seconds % 60;
  second = (second < 10)? '0' + second : second;

  return minute + ':' + second;
}
