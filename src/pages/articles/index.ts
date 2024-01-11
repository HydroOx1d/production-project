import { ArticleAsyncComponent as ArticlePage } from "./ui/Articles.async";
import { articlesReducer, articlesActions } from "./model/slice/articlesSlice";
import { ArticlesSchema } from "./model/types/articles";

export {
	ArticlePage,
	articlesActions,
	articlesReducer,
	ArticlesSchema
};