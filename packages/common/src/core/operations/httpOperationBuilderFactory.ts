import FetchHttpOperation from "./fetchHttpOperation";
import HttpOperationBuilder from "./httpOperationBuilder";

class HttpOperationBuilderFactory {
    public createForFetch<ResponseDataType = unknown>(): HttpOperationBuilder<ResponseDataType> {
        const fetchEngine = new FetchHttpOperation();
        return new HttpOperationBuilder<ResponseDataType>(fetchEngine);
    }
}

export default new HttpOperationBuilderFactory();
