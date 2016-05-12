export function stripBrsFromText(str){
  return str.replace(/(<br \/>)|(<br\/>)/g, '\n');
}
