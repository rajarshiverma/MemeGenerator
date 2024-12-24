const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
let uploadedImage = null;

imageInput.addEventListener('change', (event) =>{
    const file = event.target.files[0];
    const reader = new FileReader();//Allows to access file as URL
    
    reader.onload = (e) =>{
        const img = new Image();//create new image object
        img.src = e.target.result;
        img.onload = () =>{
            uploadedImage = img;//stores the image in the uploadedImage variable
            drawImage();
        };
    };
    reader.readAsDataURL(file);
});

function drawImage(){
    if (uploadedImage){
        //clear canvas and set canvas dimensions to fit image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

        // Get Text values
        const topText = document.getElementById('topText').value;
        const bottomText = document.getElementById('bottomText').value;

        //Set text Styles
        ctx.font = '30px impact';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';

        //Draw top text
        ctx.fillText(topText, canvas.width / 2, 50)
        ctx.strokeText(topText, canvas.width / 2, 50)

        //Draw bottom text
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    }
}

function generateMeme(){
    drawImage();
}

function downloadMeme(){
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
}