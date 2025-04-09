import React from 'react'
import blueplanet from '../assets/img/blueplanet.png'
import { Link } from 'react-router-dom'

export default function Disclaimer () {
	React.useEffect(() => {
		document.title = 'Community Guidelines | RESOC'
		return () => {
			document.title = 'NOTES-SIT | RESOC'
		}
	}, []);
  return (
    <>
      <section className="p-1">
				<div className="container p-sm-0"
				>
					<div className=" m-sm-0 d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">TOS/CG<span></span></h1>
							<p className="lead my-4">
								Please go through the following community guidelines.
							</p>
						</div>
						<img className="img-fluid w-50 d-none d-sm-block" src={blueplanet} alt="in office" />
					</div>
				</div>
			</section>
				<div>
					<div className="container p-2">
						<p>
						<b>Disclaimer</b>: This is a community-driven project. We are <b>not responsible for any kind of loss or damage caused by the content provided </b> on this website. The content is provided for educational purposes only. At RESOC, we value transparency and openness, which is why we want to make sure that our contributors are recognized for their hard work. If you find any <b>content inappropriate</b>, or if you feel that you&apos;re one of the contributors but <b>your name is not listed</b>, or if you find any discrepancy in the notes listed, please do not hesitate to contact us via the community chat and mention your email address for further communication. As a community-driven project, we hope you understand that RESOC is moderated by a group of students, and while we strive for accuracy and completeness in our notes, errors may occur. We encourage you to be vigilant and ensure that the materials you are referring to are up-to-date. We are all in this together, and our shared objective is to make education accessible to everyone. Together, we can make RESOC a reliable source of information for all learners. The community chat is open to all your queries and suggestions. You can also contact us via email at <a className='text-var' href="mailto:anubhabr50@gmail.com"> anubhabr50@gmail.com</a>
						</p>
						<p>
						At RESOC, we believe in the power of free and open-source content. Therefore, we want to make it very clear that <b>neither RESOC nor any member of RESOC will ever ask for payment for using our website or downloading our notes</b>. RESOC has an <a href='/static/License.txt' className='text-var'>MIT license</a>, which means that our content is free to use, modify, and distribute. We stand for a community that helps each other grow and we do not partake in activities that involve payment for premium notes or not letting users download notes. Please do not entertain any such requests. We want to maintain the integrity of our community and provide a safe and accessible space for all.
						</p>
						<p>
							<b>Contributing to RESOC</b>: Contributing to RESOC is an excellent way to give back to the community and share your knowledge with the world. We are always looking for contributors. If you are interested in contributing to RESOC, please contact us via the <Link className='text-var' to='/contributions'>contributions page</Link>.  Make sure that the uploaded documents are in <b>ppt, docx, pdf, or a zip file of pdfs only</b>. We do not accept any other file formats. You must be logged in while submitting a request since we require your associated email and name for further communication. You always have the option of logging in through any email address you want, but make sure that you are available to communicate using that email address. You will get a download link once you've successfully submitted your document. The next step is to edit the notes <Link className='text-var' to='https://github.com/fuzzymf/resoc/blob/main/src/notes/data.json' > record file </Link> and open a pull request to the main branch. Include your changes under the particular subject using the download link that you get after contributing. If you are unable to upload your notes, please contact us via email( anubhabr50@gmail.com ). We&apos;ll be happy to help you out. We&apos;ll be glad to accept your contributions after scrutiny to ensure that the content is of high quality and is not misleading. As a contributor, you&apos;ll be listed in the contributors&apos; list, and you can always add your donations/sponsorship links there. In any case, RESOC will always be happy to help you out, even if you&apos;re not able to add your details.
						</p>
						<p>
							<b>Funding</b>: We understand that funding is a sensitive topic, which is why we want to make it clear that RESOC reserves the right to claim sole jurisdiction on the donations/sponsorships received via the website. However, if you are a contributor, you are more than welcome to add your donation/sponsorship link to the contributors&apos; list in the <a className='text-var'href="/notes">notes</a> section to directly receive donations. This helps us maintain transparency and avoid conflicts. If you are unable to add your funding information and want us to contribute a part of the donations, we&apos;re open to that, and we&apos;ll be happy to help.
						</p>
						<p>
						<b>The community: </b>We want to create a safe and inclusive community here at RESOC, where everyone is respected and treated with kindness. We ask that all users maintain the essence of our community, which is to help one another learn and grow. Please ensure that you do not hurt sentiments or use language that could be considered offensive or discriminatory. We understand that disagreements may arise, but we ask that all discussions remain civil and respectful. Let&apos;s work together to make RESOC a positive and uplifting space for all. If you see any inappropriate behavior, please do not hesitate to report it to us via the community chat or email. We appreciate your cooperation in making RESOC a welcoming community for everyone.
						</p>
						<p>
						We hope that you find our community guidelines clear and informative. At RESOC, we strive to provide high-quality educational content, and we welcome all feedback, queries, and suggestions. Let&apos;s work together to create a better world, one step at a time.
						</p>
						</div>

						With love and pizza dreams,
						<br/>
						- TeamSFY ❤️

				</div>
				
    </>
  )
}
