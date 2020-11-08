import { useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ProfileProps } from "interfaces";
import { useUser } from "providers/UserProvider";
import { useRouter } from "next/router";

const ProfileForm = ({ user }: ProfileProps) => {
	const { dispatch } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (user?.name) {
			router.push("/dashboard");
		}
	}, [user]);

	console.log(user);

	return (
		<Formik
			initialValues={{
				type: true,
				name: user.name || user.nickname,
			}}
			validationSchema={Yup.object().shape({
				name: Yup.string().required(),
				type: Yup.boolean().required(),
			})}
			onSubmit={async ({ name, type }, { setSubmitting }) => {
				try {
					const { data } = await axios.post("/api/account", {
						id: user.sub,
						name,
						type,
						email: user.name,
					});
					dispatch({ type: "SAVE_USER", payload: data });
				} catch (err) {
					alert(err.message);
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<div style={{ marginBottom: 20 }}>
						<label>Name</label>
						<div>
							<Field style={{ width: "50%", marginBottom: 10 }} name="name" />
							<ErrorMessage name="name" />
						</div>
					</div>
					<div style={{ marginBottom: 40 }}>
						<Field type="checkbox" name="type" /> I'm a teacher
						<ErrorMessage name="type" />
					</div>
					<button
						type="submit"
						style={{ marginBottom: 40 }}
						disabled={isSubmitting}
					>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default ProfileForm;
