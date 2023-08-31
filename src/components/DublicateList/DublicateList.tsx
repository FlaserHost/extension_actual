// @ts-nocheck
import { useState, FC } from 'react';
import styles from './DublicateList.module.sass';
import classnames from "classnames";
import Button from "../Button";

const DublicateList: FC<VacanciesListProps> = ({ vacancies, requestParams, setShowLoader, setConnected, vacancyID, setAdditionDoubleRecord }) => {
    const [open, setOpen] = useState(false);
    const [selectValue, setSelectValue] = useState('');

    const [serverUrl] = useState<string>(requestParams.serverUrl);
    const [databaseUrl] = useState<string>(requestParams.databaseUrl);
    const [token] = useState<string>(requestParams.token);
    const [portUrl] = useState<string>(requestParams.portUrl);

    const getSelectValue = () => {
        if (!selectValue) {
            return '';
        }

        const selectValueItem = vacancies.find((item) => item?.candidate_id === selectValue);
        return selectValueItem?.name;
    };

    const sendCadidate = () => {
        if (selectValue) {
            let candidateUrl = '';
            chrome && chrome.tabs && chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                candidateUrl = tabs[0].url;

                if (candidateUrl) {
                    setShowLoader(true);

                    const data = {
                        GUID: vacancyID,
                        candidate_id: selectValue,
                        URL: candidateUrl,
                        twink: true
                    }

                    fetch(`${serverUrl + (databaseUrl ? '/' + databaseUrl : '') + (portUrl ? ':' + portUrl : '')}/hs/extension/candidates/candidates`, {
                        method: 'POST',
                        headers: {
                            'Authorization': "Basic " + token,
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => {
                            if (res.status === 200) {
                                setSelectValue('');
                                setAdditionDoubleRecord({ isDouble: 'Успех', title: 'Успех' });
                            }
                        })
                        .catch(() => {
                            setConnected(false);
                            localStorage.setItem("connected", "false")
                        })
                        .finally(() => setShowLoader(false))
                }
            });

        }
    }

    return (<div className={styles.wrapper}>
        <p className={styles.title}>Выберите кандидата для объединения</p>
        <div>
            <div
                className={classnames({
                    [styles.selectWrap]: true,
                })}
            >
                <div
                    onClick={() => setOpen(open => !open)}
                    className={classnames({
                        [styles.select]: true, [styles.active]: !!open,
                    })}
                >
                    <div className={styles.selectValueWrap}>
                        {getSelectValue()}
                    </div>
                    <span
                        className={classnames({
                            [styles.arrow]: true,
                            [styles.active]: !!open
                        })}
                    />
                </div>

                <div
                    className={classnames(
                        {
                            [styles.contentWrap]: true,
                            [styles.active]: !!open
                        },
                    )}
                >
                    <ul className={styles.content}>
                        {vacancies.length
                            ? vacancies.map(item => (
                                <li
                                    key={item.candidate_id}
                                    onClick={() => {
                                        setOpen(false);
                                        setSelectValue(item.candidate_id);
                                    }}
                                    className={classnames({
                                        [styles.option]: true,
                                        [styles.active]: selectValue === item.candidate_id
                                    })}
                                >
                                    {item.name}
                                </li>
                            ))
                            : null}
                    </ul>
                </div>
            </div>
        </div>
        <Button merge text='Объединить' callback={() => sendCadidate()} />
    </div>);
}

export default DublicateList;