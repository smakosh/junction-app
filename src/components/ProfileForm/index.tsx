import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const ProfileForm = ({
	user,
}: {
	user: { name: string; nickname: string; sub: string };
}) => {
	const router = useRouter();

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
					await axios.post("/api/account", {
						id: user.sub,
						name,
						type,
						email: user.name,
					});
					router.push("/dashboard");
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
