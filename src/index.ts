import { ApolloServer } from "@apollo/server";
import express, { json } from "express"
import { expressMiddleware } from "@apollo/server/express4"

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT)||8000;
    //create graphql server    
    const gqlServer = new ApolloServer({
        typeDefs:`
            type Query{
                hello: String
                say(name: String):String
            }
        `,  //schema as a string
        resolvers:{
            Query:{
                hello: () => `hey there, I am a graphql server`,
                say:(_, {name}:{name: string}) => `Hey ${name}, How are you?`
            },
        }, //actual function which will executed
    })
    await gqlServer.start();
    app.get("/", (Req,Res)=>{
        Res.json({message:"Server is up and running"});
    });
    app.use("/graphql", json(), expressMiddleware(gqlServer));
    app.listen(PORT,()=>console.log(`App is running at port ${PORT}`));   
}
init();