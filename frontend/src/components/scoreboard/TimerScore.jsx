
import {useEffect, useRef, useState } from "react"; 
import { useTasks } from "../../../utils/ProviderContext";
import {ConfigProvider, Table, Tag ,Layout, Carousel , List, Statistic, Button, Drawer, Flex, Radio, Card, Space, Row, Col, Divider, Typography  } from 'antd';
import {ArrowUpOutlined, ArrowDownOutlined, UpOutlined  } from '@ant-design/icons';


export  function TimerScore({TSeconds, TimerSeconds}) {  
	const {
			setTimerSeconds,
			timerSeconds,
	} = useTasks();

	const Ref = useRef(null);

	const [timer, setTimer] = useState('00:00');

	const getTimeRemaining = (e) => {
			const total = Date.parse(e) - Date.parse(new Date());
			const seconds = Math.floor((total / 1000) % 60);
			const minutes = Math.floor((total / 1000 / 60) % 60);
			const hours = Math.floor((total / 1000 / 60 / 60) % 24);
			return {
					total, hours, minutes, seconds
			};
	}

	const startTimer = (e) => {
		let { total, hours, minutes, seconds } = getTimeRemaining(e);
		if (total >= 0) {
			setTimer(
				// (hours > 9 ? hours : '0' + hours) + ':' +
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}

	const clearTimer = (e) => {
			setTimer('00:00');
			if (Ref.current) clearInterval(Ref.current);
			const id = setInterval(() => {
					startTimer(e);
			}, 1000)
			Ref.current = id;
	}

	const getDeadTime = () => {
		let deadline = new Date();
		deadline.setSeconds(deadline.getSeconds() + timerSeconds);
		return deadline;
	}

	useEffect(() => {
			clearTimer(getDeadTime());
	}, [timerSeconds]);

	const onClickReset = () => {
			clearTimer(getDeadTime());
	}
	return (
		<>
			<ConfigProvider
					theme={{
							token: {
								colorText:'white',
								fontSize:150,
								lineWidth:0,
								lineHeight:1.20
							},
							components: { Table: {},},
					}}
					>
					{timer}
			</ConfigProvider>
		</>
	)
} 