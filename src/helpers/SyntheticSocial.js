import {Button} from "react-bootstrap";
import React from "react";

const theseAreComments = [
    {
        username: "Timothy",
        date: Date.now(),
        comment: "I always knew you could do it.",
    },
    {
        username: "Tomothy",
        date: new Date(Date.now() - 2000),
        comment: "Took long enough",
    },
    {
        username: "Samantha",
        date: new Date(Date.now() - 30000),
        comment: "Great Job Friend!",
    },
    {
        username: "Jamantha",
        date: Date.now(),
        comment: "Well okay. Fine!",
    },
    {
        username: "Dory Booths",
        date: new Date(Date.now() - 99000),
        comment: "When I was a child I always thought something like this could happen.",
    },
    {
        username: "xFrenchy",
        date: new Date(Date.now() - 123000),
        comment: "I like big croissant and I cannot lie. All you other Frenchies can't deny.",
    },
    {
        username: "BenLeMarc",
        date: Date.now(),
        comment: "Butts",
    },
    {
        username: "Trollalala",
        date: new Date(Date.now() - 2012300),
        comment: "Weird",
    },
    {
        username: "Samantha",
        date: new Date(Date.now() - 200300),
        comment: "Great Job Friend!",
    },
    {
        username: "BADOOM",
        date: Date.now(),
        comment: "AASDK ASDOASD DHEUEIDA ",
    },
    {
        username: "QA",
        date: new Date(Date.now() - 12387615),
        comment: "TESTING COMMENT POSTING",
    },
    {
        username: "ASDJ ASD",
        date: new Date(Date.now() - 238623),
        comment: "ASDLFJKAHSDFIIF",
    },
    {
        username: "BEEP BOOP",
        date: Date.now(),
        comment: "1010010010111001011010101010010101001110100101110010101011101001011",
    },
    {
        username: "Bleep",
        date: new Date(Date.now() - 37861239),
        comment: "[Hello I am Bleep bot you are violating... no terms of service]",
    },
    {
        username: "FAFAFAFAFAFA",
        date: new Date(Date.now() - 372891),
        comment: "My username is what crying children sound like.",
    },
]

export function SynthesizeSocialContact(feed){
    let newfeed = feed.slice();
    for(let i = 0; i < newfeed.length; i+=1){
        newfeed[i] = SynthesizeSocial(newfeed[i]);
    }
    return newfeed;
}

export function SynthesizeSocial(post){
    const choice = Math.floor(Math.random()*4)
    if(choice === 0){
        post['comments'] = [];
        post['likes'] = 0;
        post['dislikes'] = 0;
        return post;
    }else if(choice === 1){
        post['comments'] = [];
        post['likes'] = Math.floor(Math.random()*20);
        post['dislikes'] = Math.floor(Math.random()*5);
        return post;
    }else if(choice === 2){
        post['comments'] = commentOn(theseAreComments);
        post['likes'] = Math.floor(Math.random()*20);
        post['dislikes'] = Math.floor(Math.random()*5);
        return post;
        return
    }else{
        post['comments'] = commentOn(theseAreComments);
        post['likes'] = Math.floor(Math.random()*20);
        post['dislikes'] = Math.floor(Math.random()*5);
        return post;
        return
    }

}

export function commentOn(comments){
    let commentSection = comments.slice()
    var section = [];
    const choice = Math.floor(Math.random()*8)
    for(let i = 0; i < choice; i+=1){
        const index = Math.floor(Math.random()*commentSection.length);
        let post = commentSection[index]; //pick a random one
        section.push(post);
        commentSection.splice(index,1);
    }
    return section.slice();
}