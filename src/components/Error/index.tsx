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

    const [additionDoubleRecord, setAdditionDoubleRecord] = useState({ isDouble: 'Норма', title: title });
    const additionPanel = () => setAdditionDoubleRecord({ isDouble: 'Объединить', title: 'Объединение' });
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h2 className={styles.header}>{additionDoubleRecord.title}</h2>
                {additionDoubleRecord.isDouble === 'Норма' ? (<>
                    <div className={styles.text}>{text}</div>
                    <div className={styles.buttonWrapper}>
                        {setDouble ? (<>
                            <Button text='Все равно добавить' callback={setDouble} />
                            <Button text='Объединить' callback={additionPanel} />
                        </>) : ''}
                    </div>
                </>) : additionDoubleRecord.isDouble === 'Объединить' ? (<div className={styles.buttonWrapper}>
                    <DublicateList
                        vacancies={doubleData.twins}
                        requestParams={requestParams}
                        setShowLoader={setShowLoader}
                        setConnected={setConnected}
                        vacancyID={doubleData.vacancy_id}
                        setAdditionDoubleRecord={setAdditionDoubleRecord}
                    />
                </div>) : (<div className={styles.text}>Кандидат успешно объединен</div>)}
                <div className={styles.buttonWrapper}>
                    <Button text={additionDoubleRecord.isDouble !== 'Успех' ? closeText : 'Закрыть'} callback={close} />
                </div>
            </div>
        </div>
    )
}

export default Error