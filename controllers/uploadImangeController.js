const fs = require('fs');
const { type } = require('os');
const path = require('path');

// save image to folder uploads with base64 encoded string
exports.saveImage = async (baseImage) => {
    const projectPath = path.join(__dirname, '../uploads');
    const ex = baseImage.substring(baseImage.indexOf('/') + 1, baseImage.indexOf(';base64'));
    
    // set file name
    let fileName = "";
    if(ex === 'svg+xml'){
        fileName = Date.now() + '.svg';
    }else{
        fileName = `${Date.now()} . ${ex}`;
    }
    
    let image = decodeBase64Image(baseImage);
    
    await fs.writeFileSync(`${projectPath}/${fileName}`, image.data,{encoding: 'base64'});
    
    return fileName;
}

// decode base64 image
const decodeBase64Image = (dataString) => {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    
    return {
        type: matches[1],
        data: matches[2]
    }
}
