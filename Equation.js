var halfequation1 = ['2H2O', '+', '2e-', '→', '2OH-', '+', 'H2'];
var halfequation2 = ['2OH-', '→', 'O2', '+', '2H+', '+', '4e-'];
var half1 = halfequation1.join('  ');
var half2 = halfequation2.join('  ');
function txt(t, x, y) {
  this.t = t;
  this.x = x;
  this.y = y;
  this.show = function() {
    textSize(20);
    fill(0);
    noStroke();
    text(this.t, this.x, this.y);
  };
}
var txts = [];
var txts2 = [];
function setup() {
  createCanvas(600, 300);
  let count = 20;
  for(let i = 0; i < halfequation1.length; i++) {
    txts.push(new txt(halfequation1[i], count, 100));
    count+=halfequation1[i].length*10+15;
  }
  count = 20;
  for(i = 0; i < halfequation2.length; i++) {
    txts2.push(new txt(halfequation2[i], count, 150));
    count+=halfequation2[i].length*10+15;
  }
}
var count = 0;
var onecount;
function draw() {
  background(200);
  textSize(20);
  text('Cathode Reduction Half: '+half1, 30, 20);
  text('Anode Oxidation Half: '+half2, 30, 45);
  for(let i = 0; i < txts.length; i++) {
    txts[i].show();
  }
  for(let i = 0; i < txts2.length; i++) {
    txts2[i].show();
  }
  if(count == 0) {
    textSize(17);
    text("Since the reduction half doesn't have the same amount of electrons as the oxidation half, it must be multiplied by two.", 350, 100, 200, 300);
  }else if(count == 1) {
    textSize(17);
    text("Now the equations need to be combined and simplified because the amounts of electrons on both sides are the same.", 350, 100, 200, 300);
  }else if(count == 2) {
    one();
    text('Now that the equations are combined, it can be simplified. The 4e- can be removed from both sides of the equations.', 50, 150, 500, 300);
  }else if(count == 3) {
    two();
    text('Now that the electrons are gone, the 2H+ and 2 of the OH- can combine to form water, or H20.', 50, 150, 500, 300);
  }else if(count == 4) {
    three();
    text('Now that there are water molecules on both sides, the two water molecules on the right side can cancel 2 water molecules from the left side.', 50, 150, 500, 300);
  }else if(count == 5) {
    text("There are still 2 OH-'s on both sides and they can be cancelled out to leave the final equation.", 50, 150, 500, 300);
  }else if(count == 6) {
    four();
    text("This final equation shows that the products have a 2 to 1 ratio of hydrogen to oxygen which are both in molecules becuase they are diatomic.", 50, 150, 500, 300);
  }
}
function mousePressed() {
  if(count==0) {
    for(let i = 0; i < txts.length; i++) {
      if(txts[i].t.charAt(0) == '2') {
        txts[i].t = txts[i].t.slice(1);
        txts[i].t = '4'+txts[i].t;
      }
    }
    txts[6].t = '2' + txts[6].t;
  }else if(count==1) {
    txts.splice(3,0,new txt('+', txts[2].x + txts[2].t.length*10 + 15, txts[2].y));
    txts.push(new txt('+', txts[7].x + txts[7].t.length*10 + 15, txts[7].y));
    for(let i = 4; i < txts.length; i++) {
      txts[i].x += 90;
    }
  }else if(count == 3) {
    txts[3].t = '2OH-';
    txts.push(new txt('2OH-', txts[3].x, txts[3].y));
    onecount=0;
  }else if(count == 4) {
    txts2.splice(2, 2);
    txts[0].t = '2H2O'
  }else if(count == 5) {
    txts2.splice(0,1);
    txts.splice(1,1);
    txts.splice(2,2);
  }
  count++;
}
function one() {
  if(txts2.length == 7) {
    txts2.splice(1,1);
  }
  //console.log(2);
  if(txts2[0].x < txts[3].x + 30) {
    //console.log(1);
    txts2[0].x+=1.25;
  }
  if(txts2[0].y > txts[3].y) {
    txts2[0].y-=0.39;
  }
  if(txts2[1].x < txts[8].x + 20) {
    for(let i = 1; i < txts2.length; i++) {
      txts2[i].x+=2;  
    }
  }
  if(txts2[1].y > txts[8].y) {
    for(let i = 1; i < txts2.length; i++) {
      txts2[i].y-=0.35;
    }
  }
}
function two() {
  if(txts.length == 9) {
    txts.splice(2, 2);
  }
  if(txts2[txts2.length-1].t == '4e-') {
    txts2.splice(txts2.length-2, 2);
  }
  if(txts[2].x > txts[1].x + 80){
    for(let i = 2; i < txts.length; i++) {
      txts[i].x -= 2;
    }
    for(let i = 0; i < txts2.length; i++) {
      txts2[i].x -= 2;
    }
  }
}
//txts[3]
function three() {
  if(txts[7]) {
  if(onecount == 0 && txts[7].y < txts[3].y + 40) {
    txts[7].y += 0.8;
  }else {
    onecount = 1;
  }
  if(txts[7].x < txts2[3].x && onecount == 1) {
    txts[7].x+=2;
  }
  if(txts[7].y > txts2[3].y && onecount == 1) {
    txts[7].y -= 0.5;
  }else if(onecount == 1){
    txts2[3].t = '2H2O';
    if(txts[7]) {
      txts.splice(7,1);
    }
  }
  }
}
function four() {
  if(txts[1].x > txts[0].x + 60) {
    txts[1].x-=1;
  }
  if(txts[2].x > txts[1].x + 30) {
    txts[2].x -=2;
    txts[3].x -=2;
    txts2[0].x -=2;
  }
}
