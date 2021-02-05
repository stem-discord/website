console.log(`fuk yeah`);

const canvas = document.getElementById(`fak`);
const game = canvas.getContext(`2d`);


function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  game.fillStyle = `black`;
  game.fillRect(0, 0, canvas.width, canvas.height);
  game.fillStyle = `green`;
  game.fillRect(10, 10, 100, 100);
}

window.addEventListener(`resize`, (e) => {
  render();
});

window.onload = () => {
  render();
};

function renderNode(a, b) {

}

// export file example
// global component pool
/**
 * {
 * 	"uuid": {
 *   "export": "my circuits",
 *  }
 * }
 * 
 */