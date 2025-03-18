class board{
    constructor(width,height){
        this.board=[]
        for(let x=0;x<width;x++){
            this.board.push([])
            for(let y=0;y<height;y++){
                this.board[x].push(Math.round(Math.random()))
            }
        }
        this.height=height
        this.width=width
        this.tiles=width*height
	this.cursor=[0,0]
    }
    render(canvas){
        let c=canvas.getContext("2d")
        let scaleW=canvas.width/this.width
        let scaleH=canvas.height/this.height
        for(let x=0;x<this.width;x++){
            for(let y=0;y<this.height;y++){
                if(this.board[x][y]==0){
                    c.beginPath()
                    c.rect(x*scaleW,y*scaleH,scaleW,scaleH)
                    c.fillStyle="white"
                    c.fill()
                }else if(this.board[x][y]==1){
                    c.beginPath()
                    c.rect(x*scaleW,y*scaleH,scaleW,scaleH)
                    c.fillStyle="black"
                    c.fill()
                }
		if(x==this.cursor[0]&&y==this.cursor[1]){
                    c.strokeStyle="red"
                    //c.lineWidth=10
                    c.stroke()
                }
            }
        }
	document.getElementById("ticking").innerHTML="Playing : "+playing
    }
    tick(){
        let copy=JSON.parse(JSON.stringify(this.board))
        for(let x=0;x<this.width;x++){
            for(let y=0;y<this.width;y++){
                let q=this.nieghbor(x,y)
		if(this.board[x][y]==1){
			if(q<2){
				copy[x][y]=0
			}
			if(q>1&&q<4){
				copy[x][y]=1
			}
			if(q>3){
				copy[x][y]=0
			}
		}else if(this.board[x][y]==0&&q==3){
			copy[x][y]=1
		}//else console.log("q=",q,"x=",x,"y=",y)

            }
        }
	this.board=copy
    }
    nieghbor(x,y){
        let a=0
	try{if(this.board[x-1][y-1]==1){a++}}catch{}
	try{if(this.board[x-1][y]==1){a++}}catch{}
	try{if(this.board[x-1][y+1]==1){a++}}catch{}
	try{if(this.board[x][y-1]==1){a++}}catch{}
	try{if(this.board[x][y+1]==1){a++}}catch{}
	try{if(this.board[x+1][y-1]==1){a++}}catch{}
	try{if(this.board[x+1][y]==1){a++}}catch{}
	try{if(this.board[x+1][y+1]==1){a++}}catch{}
        return a
    }
}
//Setup
life=new board(50,50)
//setInterval(()=>{life.tick();life.render(document.getElementById("game"))},5000)
playing=false
setInterval(()=>{life.render(document.getElementById("game"))},100)
playpause=()=>{
	if(playing){
		clearInterval(id)
		playing=false
	}else{
		id=setInterval(()=>{life.tick()},100)
		playing=true
	}
}
document.addEventListener('keydown',(e)=>{
	if(e.code=="KeyZ"){
		playpause()
	}else if(e.code=="ArrowUp"&&life.cursor[1]>0){
		life.cursor[1]--
	}else if(e.code=="ArrowDown"&&life.cursor[1]<life.width){
                life.cursor[1]++
        }else if(e.code=="ArrowLeft"&&life.cursor[0]>0){
                life.cursor[0]--
        }else if(e.code=="ArrowRight"&&life.cursor[0]<life.height){
                life.cursor[0]++
        }else if(e.code=="Space"){
		life.board[life.cursor[0]][life.cursor[1]]=Number(!life.board[life.cursor[0]][life.cursor[1]])
	}
})
