import React from 'react';
import contributions from '../assets/img/contributions.svg';
import { Form, Card } from 'react-bootstrap';
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { CloudUploadFill } from 'react-bootstrap-icons';

// Firebase Modular Imports
import app from '../firebase';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import {
	getFirestore,
	collection,
	doc,
	addDoc,
} from 'firebase/firestore';

export default function Contributions() {
	React.useEffect(() => {
		document.title = 'Contributions | VISTOFY'
		return () => {
			document.title = 'NOTES-SIT | VISTOFY'
		}
	}, []);

	let progress = 0;
	const firestore = getFirestore(app);
	const storage = getStorage(app);

	const name = auth.currentUser.displayName
		? auth.currentUser.displayName
		: auth.currentUser.email.slice(0, auth.currentUser.email.indexOf('@'));

	const email = auth.currentUser.email;

	const [isDark, setIsDark] = React.useState(
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [errdef, setErrdef] = React.useState('');
	const [status, setStatus] = React.useState('');
	const [downloadLink, setDownloadLink] = React.useState("");

	React.useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (event) => setIsDark(event.matches);
		mediaQuery.addEventListener('change', handleChange);
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, []);

	const handleSubmit = React.useCallback(async (e) => {
		e.preventDefault();

		if (!selectedFile) return;

		if (selectedFile.size > 100000000) {
			setErrdef('File size is too large. Please upload a file less than 100 MB');
			return;
		}

		const file = selectedFile;
		const metadata = {
			contentType: file.type
		};

		const storageRef = ref(storage, `uploads/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		uploadTask.on('state_changed',
			(snapshot) => {
				progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				progress = progress.toFixed(2);
				setStatus(`Uploading ${progress} %`);
			},
			(error) => {
				switch (error.code) {
					case 'storage/unauthorized':
						setErrdef('User doesn\'t have permission to access the object');
						break;
					case 'storage/canceled':
						setErrdef('User canceled the upload');
						break;
					case 'storage/unknown':
						setErrdef('Unknown error occurred, inspect error.serverResponse');
						break;
					default:
						setErrdef('Unknown error occurred');
				}
			},
			async () => {
				setErrdef('');
				setStatus(`Uploaded ${progress} %`);

				try {
					const { uid } = auth.currentUser;

					await addDoc(
						collection(firestore, "Contributions", uid, "submits"),
						{
							name,
							email,
							filename: file.name,
						}
					);

					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					setDownloadLink(downloadURL);
					console.log('File available at', downloadURL);
				} catch (err) {
					setErrdef("Failed to save metadata to Firestore.");
					console.error(err);
				}
			}
		);
	}, [selectedFile, name, email, firestore, storage]);

	React.useEffect(() => {
		const timeoutId = setTimeout(() => setErrdef(''), 3000);
		return () => clearTimeout(timeoutId);
	}, [errdef]);

	React.useEffect(() => {
		const timeoutId = setTimeout(() => setStatus(''), 3000);
		return () => clearTimeout(timeoutId);
	}, [status]);

	return (
		<>
			<section className="py-4 px-4 px-sm-0">
				<div className="d-sm-flex align-items-center justify-content-between mainc">
					<div className="img-home">
						<h1 className="heading">Share<span></span></h1>
						<p className="lead my-4">
							Contact us here to share your notes and contribute to VISTOFY
						</p>
					</div>
					<img className="img-fluid w-50 d-none d-sm-block" src={contributions} alt="in office" />
				</div>
			</section>

			<div className='container px-sm-5'>
				<Card style={{
					borderRadius: '0.5rem',
					borderColor: 'var(--text-var)',
					borderWidth: '1px',
					borderStyle: 'dashed',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: 'var(--bg-dark)'
				}}>
					<Card.Body className='text-var'>
						{errdef && <div className="alert alert-danger">{errdef}</div>}
						{status && <div className="alert alert-success">{status}</div>}

						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-2" controlId="formGroupName">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" value={name} disabled />
							</Form.Group>
							<Form.Group className="mb-2" controlId="formGroupEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" value={email} disabled />
							</Form.Group>
							<div className="mb-3">
								<div className="input-group">
									<input
										type="file"
										className="form-control"
										onChange={(e) => setSelectedFile(e.target.files[0])}
										aria-label="Upload"
									/>
									<button
										disabled={!(selectedFile?.size < 100000000)}
										className={`btn btn-outline-secondary ${isDark ? 'btn-dark' : 'btn-light'} w-100 mt-2`}
										style={{ color: 'var(--text-var)' }}
										type="submit"
										id="inputGroupFileAddon04"
									>
										{isDark ? "Upload" : "Submit request"} <CloudUploadFill />
									</button>
								</div>
							</div>
						</Form>

						<p>
							{downloadLink ? (
								<span>
									Your file has been uploaded successfully. Here is the <b><a href={downloadLink} target='_blank' rel='noreferrer noopener' className='text-var'>download link</a></b>.
									You can now either update the <a href='https://github.com/fuzzymf/VISTOFY/blob/main/src/notes/data.json' className='text-var'>notes record file</a> and raise a <a href='https://github.com/VISTOFY/fuzzymf' className='text-var'>pull request</a>, <b>or</b> you can email us the link and mention the subject and branch at <a href="mailto:anubhabr50@gmail.com" className='text-var'>anubhabr50@gmail.com</a>
								</span>
							) : (
								<span>You&apos;ll get your file link for you to share with friends here.</span>
							)}
						</p>

						<p>
							Please upload your file (less than 100 MB) in a pdf format or a zip file of pdfs <b>only</b>.<br />
							Please go through the <Link to='/community-guidelines' className='text-var'>contributions guidelines</Link> before submitting a request.
						</p>
					</Card.Body>
				</Card>

				<div className="py-3">
					<h1 className='mt-3 '> Contributors</h1>
					<ul className='mt-3' style={{ listStyleType: "none", paddingLeft: "0" }}>
						<li><a href="https://linkedin.com/in/sunil-kumar-panda/" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">SUBHASHISH NAYAK</a></li>
						<li><a href="https://www.linkedin.com/in/ananya-satpathy-98529a122" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">GAYATRI CHINHARA</a></li>
					</ul>
				</div>
			</div>
		</>
	);
}
