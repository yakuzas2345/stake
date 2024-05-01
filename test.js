(async () => {
async function f() {

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 5000)
  });

  

  console.log('test'); // "done!"
}

await f();

console.log('ok') ;
})();