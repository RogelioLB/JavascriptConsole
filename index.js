const { read } = require('fs');
const readline = require('readline')
const fs = require('fs');

//Also made by RogelioLB

const plug = [];

function plugins(){
  fs.readdir(__dirname+"/plugins",(err,file)=>{
    file.forEach((f,i)=>{
      if(f.endsWith(".js")){
        plug.push({id:i,func: require(`./plugins/${f}`)});
      }
    })
    console.log(plug);

    console.log("\n\nForma de usar-- plug[<id>].func.(function)")
  })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

function exitFunc(){
  console.log("See you next time!")
  process.exit(0)
}
function Question(){
  rl.question('> ', (evaledParam) =>{
    try{
      if (evaledParam == 'exit'){
        return exitFunc()
      }
      if(evaledParam==="help"){
        plugins();
        return setImmediate(()=>Question());
      }
      let evaled = eval(evaledParam);
      if(evaledParam.includes("console.log")||evaledParam.includes("console.dir")||evaledParam.includes("console.error")){
        return setImmediate(()=>Question());
      }else{
        console.log(evaled);
        setImmediate(()=>Question());
      }
    }
      catch(err){
        console.log("Error");
        setImmediate(()=>Question());
      }
  });
}
rl.question('> ', (evaledParam) =>{
try{
  if (evaledParam == 'exit'){
    return exitFunc()
  }
  if(evaledParam==="help"){
    plugins();
    return setImmediate(()=>Question());
  }
  let evaled = eval(evaledParam);
  if(evaledParam.includes("console.log")||evaledParam.includes("console.dir")||evaledParam.includes("console.error")){
    return setImmediate(()=>Question());
  }else{
    console.log(evaled);
    setImmediate(()=>Question());
  }
}
  catch(err){
    console.log("Error");
    setImmediate(()=>Question());
  }
});

