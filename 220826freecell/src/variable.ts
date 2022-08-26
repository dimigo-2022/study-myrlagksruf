interface iState{
    pick:HTMLDivElement;
    move:{
        from:HTMLDivElement;
        to:HTMLDivElement;
        can:string;
    };
    can:boolean;
}
export const state:iState = {
    pick:null,
    move:null,
    can:true,
};