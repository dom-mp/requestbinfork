import mongoose from "mongoose";
import { RequestBody } from "../types";

class MongoController {
  private dbName: string;
  private requestBodyModel: mongoose.Model<RequestBody>;

  constructor(dbName: string = "requestBodies") {
    this.dbName = dbName;
    this.connectToDatabase();

    const schema = new mongoose.Schema<RequestBody>({
      request: mongoose.Schema.Types.Mixed,
    });

    this.requestBodyModel = this.createModel(schema);
  }

  private async connectToDatabase(): Promise<void> {
    try {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(`mongodb://localhost:27017/${this.dbName}`);
        console.log("Connected to MongoDB");
      }
    } catch (error: any) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    }
  }

  private createSchema(schema: mongoose.Schema): mongoose.Schema {
    schema.set("toJSON", {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    });

    return schema;
  }

  private createModel(schema: mongoose.Schema): mongoose.Model<RequestBody> {
    const jsonSchema = this.createSchema(schema);
    return mongoose.model<RequestBody>("RequestBody", jsonSchema);
  }

  public getModel(): mongoose.Model<RequestBody> {
    return this.requestBodyModel;
  }

  public async saveRequestBody(requestBody: any): Promise<string> {
    try {
      const newRequestBody = new this.requestBodyModel({
        requestBody,
      });
      const saved = await newRequestBody.save();
      console.log("MongoDB: Saved request", saved);
      return saved.toJSON().id!;
    } catch (error) {
      console.error("Error saving request:", error);
      throw new Error("Failed to save request body");
    }
  }

  public async getRequestBody(bodyMongoId: string) {
    try {
      const requestSaved = await this.requestBodyModel.findOne({
        _id: bodyMongoId,
      });
      if (!requestSaved) {
        throw new Error("Request not found");
      }
      console.log("Request found", requestSaved.request);
      return requestSaved.request;
    } catch (err) {
      console.error("Error fetching request body:", err);
      throw err;
    }
  }
}

export default MongoController;
