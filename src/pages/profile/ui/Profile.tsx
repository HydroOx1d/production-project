import { Country } from "entity/Country";
import { Currency } from "entity/Currency/model/types/currency";
import { ProfileCard, fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateError, profileActions, profileReducer } from "entity/Profile";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useThunkDispatch } from "shared/lib/hooks/useThunkDispatch";
import ReducerLoader, { ReducersList } from "shared/lib/reducerLoader/ReducerLoader";
import ProfilePageHeader from "./ProfilePageHeader/ProfilePageHeader";

const initialReducers: ReducersList = {
	profile: profileReducer
};

const Profile = React.memo(() => {
	const thunkDispatch = useThunkDispatch();
	const dispatch = useAppDispatch();
	const data = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateError);
	const {profileId} = useParams<{profileId: string}>();

	useEffect(() => {
		if (__PROJECT__ != "storybook") {
			if(profileId) {
				thunkDispatch(fetchProfileData(profileId));
			}
		}
	}, [profileId, thunkDispatch]);

	const onUpdateProfileName = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({
			name: value || ""
		}));
	}, [dispatch]); 

	const onUpdateProfileSurname = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({
			surname: value || ""
		}));
	}, [dispatch]); 

	const onUpdateProfileAge = useCallback((value?: string) => {
		const newValue = value?.replace(/[a-zA-Z]/g, "");
		dispatch(profileActions.updateProfile({
			age: Number(newValue || 0)
		}));
	}, [dispatch]); 
	
	const onUpdateProfileCity = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({
			city: value || ""
		}));
	}, [dispatch]);

	const onUpdateProfileUsername = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({
			username: value || ""
		}));
	}, [dispatch]);

	const onUpdateProfileAvatar = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({
			avatar: value || ""
		}));
	}, [dispatch]); 

	const onUpdateProfileCurrency = useCallback((value?: Currency) => {
		dispatch(profileActions.updateProfile({
			currency: value
		}));
	}, [dispatch]); 
	
	const onUpdateProfileCountry = useCallback((value?: Country) => {
		dispatch(profileActions.updateProfile({
			country: value
		}));
	}, [dispatch]); 

	return (
		<ReducerLoader reducers={initialReducers} removeAfterUnmount>
			<ProfilePageHeader />
			<ProfileCard
				data={data}
				isLoading={isLoading}
				error={error}
				readonly={readonly}
				validateErrors={validateErrors}
				onUpdateProfileName={onUpdateProfileName}
				onUpdateProfileSurname={onUpdateProfileSurname}
				onUpdateProfileAge={onUpdateProfileAge}
				onUpdateProfileCity={onUpdateProfileCity}
				onUpdateProfileAvatar={onUpdateProfileAvatar}
				onUpdateProfileUsername={onUpdateProfileUsername}
				onUpdateProfileCurrency={onUpdateProfileCurrency}
				onUpdateProfileCountry={onUpdateProfileCountry}
			/>
		</ReducerLoader>
	);
});

Profile.displayName = "Profile";

export default Profile;