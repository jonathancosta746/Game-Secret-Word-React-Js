import styles from './StartScreen.module.css'

const StartScreen = ({startGame}) => {
  return (
    <div className={styles.start}>
      <>
      <h1>Secret</h1>
      <h2>
        <span className={styles.title}>WO</span>
        <span className={styles.title_destaque}>R</span>
        <span className={styles.title_last}>D</span></h2>
      </>
        

      <button onClick={startGame}>PLAY</button>
    </div>
  )
}

export default StartScreen