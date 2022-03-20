const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createRadialGradient(canvas.width/2,canvas.height/2,100,canvas.width/2,canvas.height/2,250);
gradient.addColorStop(0, 'chocolate');
gradient.addColorStop(0.2, 'rosybrown');
gradient.addColorStop(0.4, 'peru');
gradient.addColorStop(0.6, 'darkgoldenrod');
gradient.addColorStop(0.8, 'saddlebrown');
gradient.addColorStop(1, 'yellowgreen');


class Symbol {
    constructor(x,y, fontSize, canvasHeight){
        this.characters = '׆׀א׃גדטוהיחםכמךלןץנףצעפסקרב׳ױשײ״װתז־IZREEL日丨疒丨尸中學改尸超竹水水竹廿女金十山一祝廿JAMES戈位緊演兆loyalty屎水月弓場卜口peace尸堂joy尸山弓有沒有5囉杯happiness堂月糖中木乃伊的2堂場大十米女鰂當堂Love堂樓早餐』屎𠃌給己知穿卑職卑熱土米水堂土honor木靠卜心機屎冖有如果屎馳尸己任那麼多天后respect孱弱5';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
        draw(context){
            this.text = this.characters.charAt(Math.floor(Math.random()* this.characters.length));
            context.fillText(this.text,this.x * this.fontSize, this.y * this.fontSize);
            if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.9882){
                this.y = 0;
            } else {
                this.y += 1;
            }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
        // console.log(this.symbols)
    }
    #initialize(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }   
    resize(width,height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();

    } 
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 150;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.textAlign = 'center'
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = gradient;
    // '#0aff0a'
ctx.font = effect.fontSize  + 'px monospace';
effect.symbols.forEach(symbol => symbol.draw(ctx));
timer = 0;
    } else {
        timer += deltaTime;
    }
requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
})