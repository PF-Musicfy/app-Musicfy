import s from './loading.module.css';

export default function Loading({ text }){
  return (
    <div className={s.container}>
      {text || 'Loading'}
      <div className={s.spinner}></div>
    </div>
  )
}
