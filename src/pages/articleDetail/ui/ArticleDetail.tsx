import { ArticleDetails } from "entity/Article";
import { AddNewCommentForm } from "features/addNewComment";
import {
	ArticleCommentList,
	articleDetailsCommentsReducer,
	fetchCommentsByArticleId,
	getArticleComments,
	getArticleDetailsCommentsIsLoading,
	sendNewCommentForArticle,
} from "features/articleCommentList";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/className";
import { useThunkDispatch } from "shared/lib/hooks/useThunkDispatch";
import ReducerLoader, { ReducersList } from "shared/lib/reducerLoader/ReducerLoader";
import Text from "shared/ui/Text/Text";
import cls from "./Article.module.scss";

const initialReducers: ReducersList = {
	articleComments: articleDetailsCommentsReducer
};

const ArticleDetail = () => {
	const {articleId} = useParams<{articleId: string}>();
	const comments = useSelector(getArticleComments.selectAll);
	const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
	const thunkDispatch = useThunkDispatch();

	React.useEffect(() => {
		if (__PROJECT__ != "storybook") {
			if (articleId) {
				thunkDispatch(fetchCommentsByArticleId(articleId));
			}
		}
	}, [articleId, thunkDispatch]);

	const onSendComment = React.useCallback(
		(value: string) => {
			thunkDispatch(sendNewCommentForArticle(value));
		},
		[thunkDispatch]
	);

	if(!articleId) {
		return (
			<div className={classNames(cls.ArticlePage)}>
        The article is not found
			</div>
		);
	}

	return (
		<ReducerLoader reducers={initialReducers} removeAfterUnmount>
			<div className={classNames(cls.ArticlePage)}>
				<ArticleDetails id={articleId} />
				<Text title="Comments" className={cls.commentTitle} />
				<AddNewCommentForm
					className={cls.commentForm}
					onSendComment={onSendComment}
				/>
				<ArticleCommentList isLoading={isLoading} comments={comments} />
			</div>
		</ReducerLoader>
	);
};

export default React.memo(ArticleDetail);