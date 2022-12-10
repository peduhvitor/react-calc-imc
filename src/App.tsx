import { useState } from 'react';
import styles from './App.module.css';
import powerdImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem';

import { levels, calculateImc, Level } from './helpers/imc';

const App = () => {

    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    const formatHeight = (e: any) => {

        const format = () => {
            let value = e.target.value;

            if(value.length < 5) {
                if(value.length > 1 && value[1] !== "." ) {
                    let valueWithPoint = `${value[0]}.${value[1]}`;
                    return valueWithPoint;
                } else {
                    return value
                }
            } else {
                let valueLimit = value.slice(0, 4);
                return valueLimit;
            }
        }

        setHeightField(format());
    }


    const formatWeight = (e: any) => {

        const format = () => {
            let value = e.target.value;

            if(value.length < 6) {
                if (value.length === 2) {
                    let valueWithPoint2 = `${value[0]}.${value[1]}`;
                    return valueWithPoint2;
                } else if (value.length === 3 && value[1] !== ".") {
                    let valueWithPoint3 = `${value[0]}${value[1]}.${value[2]}`;
                    return valueWithPoint3;
                } else if (value.length === 4 && value[1] === '.') {
                    let valueWithPoint4 = `${value[0]}${value[2]}.${value[3]}`;
                    return valueWithPoint4;
                } else if (value.length === 5 && value[2] === '.') {
                    let valueWithPoint5 = `${value[0]}${value[1]}${value[3]}.${value[4]}`;
                    return valueWithPoint5; 
                } else {
                    return value
                }
            } else {
                let valueLimit = value.slice(0, 5);
                return valueLimit;
            }
            
        }
        
        setWeightField(format());

    }


    const HandleCalculatebutton = () => {
        if(heightField && weightField) {
            setToShow(calculateImc(heightField, weightField));
        } else {
            alert('Digite todos os campos')
        }
    }

    const handleBackButton = () => {
        setToShow(null);
        setHeightField(0);
        setWeightField(0);
    }

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={ powerdImage } alt="" width={150}/>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC.</h1>
                    <p>IMC é a sigla para índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
                    
                    <input 
                        type="number"
                        placeholder="Digite a sua altura. Ex. 1.5 (em metros)"
                        value={ heightField > 0 ? heightField : ''}
                        onChange={ e => formatHeight(e) }
                        disabled={toShow ? true : false}
                    />

                    <input 
                        type="number"
                        placeholder="Digite a seu peso. Ex. 75.3 (em kg)"
                        value={ weightField > 0 ? weightField : ''}
                        onChange={ e => formatWeight(e) }
                        disabled={toShow ? true : false}
                    />

                    <button onClick={HandleCalculatebutton} disabled={toShow ? true : false}>Calcular</button>
                </div>
                <div className={styles.rightSide}>
                    {!toShow &&
                        <div className={styles.grid}>
                            { levels.map((item, key)=> (
                                <GridItem key={ key } item={ item }/>
                            )) }
                        </div>
                    }
                    {toShow && 
                        <div className={styles.rightBig}>
                            <div className={styles.rightArrow} onClick={handleBackButton}>
                                <img src={leftArrowImage} alt="" width={25} />
                            </div>
                            <GridItem item={toShow}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default App;