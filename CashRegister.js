function checkCashRegister(price, cash, cid) {
    let values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    //get total change in till
    var change = 0;
    for(let i = 0; i < cid.length; i++){
      change+=(cid[i][1])*100;
    }
    change/=100;
  
    //decide what status is
    if(cash - price > change){
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    else if(cash - price == change){
      return {status: "CLOSED", change: [...cid]};
    }
    else{
      let changeDue = (cash-price)*100;
      let changeArr = [];
      for(let i = cid.length - 1; i >= 0; i--){
        //cid / values = amount of 
        let amount = Math.round(cid[i][1] / values[i]);
        //up to amount can multiply to get as close to changeDue
        let changeFound = false;
        let iteration = 0;
        while(changeFound == false){
          if(amount == 0 || changeDue - (100*values[i]) < 0){
            changeFound = true;
            if(iteration > 0){
              changeArr.push([cid[i][0], values[i] * iteration]);
            }
          }
          else{
            iteration++;
            amount--;
            changeDue-=100*values[i];
          }
        }
      }
      if(changeDue == 0){
        return {status: "OPEN", change: [...changeArr]}; 
      }
      else{
        return {status: "INSUFFICIENT_FUNDS", change: []};
      }
    }
  }
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));