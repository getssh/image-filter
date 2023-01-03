import express, {Request, Response, request} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get('/filteredimage', async (req: Request, res: Response) => {
    const queryName = req.query;
    const qName = Object.keys(queryName)[0];
    const queryValue = req.query.image_url;
    if (qName != "image_url") {
      res.status(404).send({message: "Wrong query parameter used"});
      return;
    }
    // if (!qName.startsWith('http')) {
    //   res.status(404).send({message: "Invalid Web address"});
    //   return;
    // }
    console.log(qName);
    console.log(req.query)
    const filterImg = await filterImageFromURL(queryValue.toString());
    res.sendFile(filterImg);
    // deleteLocalFiles([filterImg]);
  });
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();