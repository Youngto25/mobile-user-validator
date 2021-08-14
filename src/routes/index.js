/**
 * Created by Fred(qq:24242811) on 2018/6/25.
 */
import React,{ Component,Fragment } from 'react'
import { connect } from 'dva'
import anime from 'animejs'
import { routerRedux } from 'dva/router'
import _ from 'lodash'
import style from './index.less'


class Index extends Component{
	state={
		show: false
	}
	componentDidMount(){
		setTimeout(()=>{
			anime({
				targets: this.button,
				opacity: 0,
				translateY: 100,
				duration: 0
			})
			anime({
				targets: this.remind,
				opacity: 0,
				translateY: 100,
				duration: 0
			})
			anime({
				targets: this.top,
				opacity: 0,
				translateY: 100,
				duration: 0
			})
			anime({
				targets: this.left,
				keyframes: [
					{rotate: 45}
				],
				duration: 0,
			})
			anime({
				targets: this.right,
				keyframes: [
					{rotate: -45}
				],
				duration: 0
			})
			anime({
				targets: this.star,
				scale: 0,
				duration: 0
			})
			anime({
				easing: 'spring(1, 80, 10, 0)',
				targets: this.top,
				opacity: 1,
				translateY: 0,
				duration: 100
			})
			anime({
				targets: this.right,
				keyframes: [
					{rotate: -45},
					{rotate: 135}
				],
				easing: 'linear',
				duration: 100,
				complete:()=>{
					anime({
					targets: this.left,
					keyframes: [
						{rotate: 225}
					],
					easing: 'linear',
					duration: 100,
					complete:()=>{
						this.setState({show: true})
						setTimeout(()=>{
							anime({
								easing: 'linear',
								targets: this.mask,
								width: 0,
								duration: 100,
								complete:()=>{
									anime({
										//easing: 'spring(1, 80, 10, 10)',
										easing: 'linear',
										targets: this.star,
										keyframes: [
											{scale: 0},
											{scale: 1},
											{scale: 0.8},
											{scale: 1}
										],
										duration: 300,
										complete: ()=>{
											anime({
												easing: 'spring(1, 80, 10, 0)',
												targets: this.remind,
												opacity: 1,
												translateY: 0,
												duration: 100,
												complete:()=>{
													anime({
														easing: 'spring(1, 80, 10, 0)',
														targets: this.button,
														opacity: 1,
														translateY: 0,
														duration: 0
													})
												}
											})
										}
									})
								}
							})
						},200)
					}
				})
				}
			})
		},500)
	}
	componentWillMount(){

	}
	/*--------------------- 渲染 ---------------------*/
	render(){
		let { name } = this.props
		return (
			<div className={style.componentView}>
				{
					false ?
						<Fragment>
							<div className={style.animationTop} ref={top=>(this.top=top)}>
								<div className={style.lineWrapper}>
									<img src={require('../assets/images/bg-line.png')} alt=""/>
								</div>
								<div className={style.starWrapper}>
									<img src={require('../assets/images/stars.png')} alt="" ref={star=>(this.star=star)} className={style.mark}/>
								</div>
								<div className={style.imageWrapper}>
									<img src={require('../assets/images/code-bg.png')} alt=""/>
									<img src={require('../assets/images/right-2.png')} alt="" className={`${style.wrong} ${style.active1}`}/>
									<div className={style.test}>
										<div className={style.left}>
											<div className={style.leftProgress} ref={left=>(this.left=left)}></div>
										</div>
										<div className={style.right}>
											<div className={style.rightProgress} ref={right=>(this.right=right)}></div>
										</div>
									</div>
									{
										this.state.show ? <div className={style.test3}></div> : null
									}
									<div className={style.mask} ref={mask=>(this.mask=mask)}></div>
								</div>
							</div>
							<div className={style.messageRemind} ref={remind=>(this.remind=remind)}>
								<div className={style.wrongRemind}>验证通过</div>
								<div className={style.name}>{name ? name : 'Richard Lee'}</div>
								<div className={`${style.message} ${style.change}`}><span>Welcome.</span></div>
							</div>
							<div className={`${style.confirmAgain} ${style.active}`} ref={button=>(this.button=button)}>
								<span>确认通过</span>
							</div>
						</Fragment>
						:
						<Fragment>
							<div className={style.animationTop} style={{opacity: 1}}>
								<div className={style.lineWrapper}>
									<img src={require('../assets/images/bg-line.png')} alt=""/>
								</div>
								<div className={style.starWrapper}>
									<img src={require('../assets/images/star-uncheck.png')} alt="" style={{transform: `scale(1)`}}/>
								</div>
								<div className={style.imageWrapper}>
									<img src={require('../assets/images/code-bg2.png')} alt=""/>
									<img src={require('../assets/images/wrong.png')} alt="" className={style.wrong}/>
									<div className={style.test2}></div>
								</div>
							</div>
							<div className={style.messageRemind} style={{opacity: 1}}>
								<div className={style.wrongRemind}>验证失败</div>
								<div className={style.name}>{name ? name : 'Richard Lee'}</div>
								<div className={style.message}>* 该用户报名该场****</div>
							</div>
							<div className={style.confirmAgain} style={{opacity: 1}}>
								<span>重新验证</span>
							</div>
						</Fragment>

				}
			</div>
		)
	}
}

export default connect((state)=>({

}))(Index)
