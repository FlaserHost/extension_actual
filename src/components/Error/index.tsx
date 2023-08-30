import {FC, useState} from 'react'
import Button from '../Button'
import DublicateList from "../DublicateList/DublicateList";
import styles from './Error.module.sass'

interface ErrorProps {
    close: () => void;
    closeText?: string
    title?: string;
    text?: string;
    setDouble?: () => void;
    doubleData?: any;
    requestParams?: any;
    setShowLoader?: any;
    setConnected?: any;
    vacancyID?: string;
}

const Error: FC<ErrorProps> = ({
    close, setDouble, doubleData, requestParams, setShowLoader, setConnected,
    title = 'Ошибка',
    text = 'Что-то пошло не так, попробуйте еще раз.',
    closeText = 'Повторить'
}) => {

    const [additionDoubleRecord, setAdditionDoubleRecord] = useState({ isDouble: false, title: title });
    const additionPanel = () => setAdditionDoubleRecord({ isDouble: true, title: 'Объединение' });

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>{additionDoubleRecord.title}</div>
                {!additionDoubleRecord.isDouble ? (<>
                    <div className={styles.text}>{text}</div>
                    <div className={styles.buttonWrapper}>
                        {setDouble ? (<>
                            <Button text='Все равно добавить' callback={setDouble} />
                            <Button text='Объединить' callback={additionPanel} />
                        </>) : ''}
                    </div>
                </>) : (<div className={styles.buttonWrapper}>
                    <DublicateList vacancies={doubleData.twins} requestParams={requestParams} setShowLoader={setShowLoader} setConnected={setConnected} vacancyID={doubleData.vacancy_id} />
                </div>)}
                <div className={styles.buttonWrapper}>
                    <Button text={closeText} callback={close} />
                </div>
            </div>
        </div>
    )
}

export default Error