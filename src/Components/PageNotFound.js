import React from 'react'
import moon from '../assets/img/earth.png'
export default function PageNotFound () {
	React.useEffect(() => {
		document.title = '404 | RESOC'
		return () => {
			document.title = 'NOTES-SIT | RESOC'
		}
	}, []);
  return (
    <>
      <section className=" py-5 cdin px-4 px-sm-3">
				<div className="container">
					<div className="d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">404<span></span></h1>
							<p className="lead my-4">
								Not Found
							</p>
							<p>
							Well... how did we get here?<br />
							Let&apos;s get back <a href='/' className='text-var'>on track</a>.
							</p>
						</div>
						<img className="img-fluid w-50 d-none d-sm-block" src={moon} alt="in office" />
					</div>
				</div>
			</section>
				<div>
					<div className="container" style={{
						minHeight: '16vh'
					}}>
											</div>	
				</div>
				
    </>
  )
}
