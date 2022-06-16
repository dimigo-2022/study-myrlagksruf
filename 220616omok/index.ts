function myFunction(e:GoogleAppsScript.Events.SheetsOnEdit) {
  const col = e.range.getColumn();
  const row = e.range.getRow();
  if(e.range.getLastColumn() !== col || e.range.getLastRow() !== row || col > 26 || row > 26) return;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const userRange = sheet.getRange(2, 27);
  let user = userRange.getValue().toUpperCase() as 'O'|'X';
  if(!user) user = 'O';
  if(e.oldValue === 'O' || e.oldValue === 'X'){
    e.range.setValue(e.oldValue);
    return;
  }
  if(!e.value || e.value.toUpperCase() !== user) {
    e.range.setValue('');
    return;
  }
  const obj = { 'O':'X', 'X':'O' };
  const range = sheet.getRange(Math.max(1, row - 4), Math.max(1, col - 4), Math.min(9, row + 4), Math.min(9, col + 4)).getValues() as string[][];
  const sero = range.length - 5;
  const garo = range[0].length - 5;
  const way = [[-1, 0], [-1, -1], [0, -1], [1, -1]];
  // Logger.log(range.map(v => v.join(',')).join('\n'));
  for(let [dx, dy] of way){
    let curSero = sero;
    let curGaro = garo;
    big : for(;typeof range[curSero]?.[curGaro] !== 'undefined'; [curGaro, curSero] = [curGaro - dx, curSero - dy]){
      Logger.log(`${curGaro}, ${curSero}`);
      const compare = String(range[curSero]?.[curGaro]);
      if(compare.toUpperCase() !== 'O' && compare.toUpperCase() !== 'X') continue big;
      for(let i = 1; i < 5; i ++){
        if(compare !== String(range[curSero + dy * i]?.[curGaro + dx * i])) continue big;
      }
      sheet.getRange(3, 27).setValue(`${e.value.toUpperCase()}의 승리!`);
      return;
    }
  }
  userRange.setValue(obj[user])
}
  