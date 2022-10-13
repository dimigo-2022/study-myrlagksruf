import fs from 'fs/promises';
import child from 'child_process';
import path from 'path';
const root = 'C:/Users/myrla/Videos';
const dir = await fs.readdir(root);
/**
 * 
 * @param {string} i
 */
const ffmpegPromise = async (i) => {
    let out = path.resolve(root, `${i.replace(path.extname(i), '')}.out${path.extname(i)}`);
    try{
        await fs.access(out);
        return '이미 파일이 존재합니다.';
    } catch(err){}
    return await new Promise((res, rej) => {
        let stream = child.spawn(`ffmpeg`, [`-i`, `${path.resolve(root, i)}`, `-c:v`, `libx264`, `-preset`, `veryfast`, `-crf`, `23`, `-c:a`, `copy`, `-profile:v`, `high`, `-level`, `4.2`, `${out}`])
        stream.stdout.on('data', data => {
            console.log(data.toString());
        });
        stream.stderr.on('data', data => {
            console.log(data.toString());
        });
        stream.on("error", rej);
        stream.on("close", res);
    })
}
for(let i of dir){
    if(!/(?<!\.out)\.mp4$/.test(i)) continue;
    try{
        let code = await ffmpegPromise(i);
        console.log(`${i} exited with code ${code}`)
    } catch(err){
        console.error(err);
    }
}
