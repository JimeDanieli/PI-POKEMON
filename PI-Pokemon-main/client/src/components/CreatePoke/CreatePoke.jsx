import React, {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {createPoke, getTypes} from '../../actions/index';
import styles from './CreatePoke.module.css'

function CreatePoke() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state);
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    name: '',
    img: '',
    healthPoints: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  });
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const stateReset = () => {
    setValues({
      name: '',
      img: '',
      healthPoints: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      types: [],
    });
  };
  let validateName = /^[a-z]+$/i;
  let validateNum = /^([0-9])*$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  const validate = () => {
    let errors = {};
    if (!validateName.test(values.name)) {
      errors.name = "Name required";
    }
    if (!validateUrl.test(values.img)) {
      errors.img = 'URL required';
    }
    if (!validateNum.test(values.healthPoints)) {
      errors.healthPoints = "Number required";
    }
    if (!validateNum.test(values.attack)) {
      errors.attack = "Number required";
    }
    if (!validateNum.test(values.defense)) {
      errors.defense = "Number required";
    }
    if (!validateNum.test(values.speed)) {
      errors.speed = "Number required";
    }
    if (!validateNum.test(values.height)) {
      errors.height = "Number required";
    }
    if (!validateNum.test(values.weight)) {
      errors.weight = "Number required";
    }
    return errors;
  };

  const handleOnChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    if (!errors.name &&
      !errors.img &&
      !errors.healthPoints &&
      !errors.attack &&
      !errors.defense &&
      !errors.speed &&
      !errors.heightt &&
      !errors.weight &&
      !errors.types) {
        console.log(values)
      dispatch(createPoke(values));
      stateReset();
      history.push('/main');

    } else {
      alert('The form is required');
    }
  };
  const handleType = (e) => {
    setValues(() => {
      return {
        ...values,
        types: values.types.concat(e.target.value)
      };
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Pokemon</h2>
      <div className={styles.cntSuperior}>
        <form onSubmit={handleOnSubmit}>
          <div >
            <label className={styles.label} htmlFor=""> Name:</label>
            <input
              className={styles.input} value={values.name} name='name' onChange={handleOnChange} type="text" placeholder='Name'>
            </input>
            <p className={styles.error}>{errors.name}</p>
          </div>

          <div>
            <label className={styles.label} htmlFor=""> Img:</label>
            <input
              className={styles.input} value={values.img} name='img' onChange={handleOnChange} type="text" placeholder='Img'>
            </input>
            <p className={styles.error}>{errors.img}</p>
          </div>

          <div>
            <label className={styles.label} htmlFor=""> Health Points:</label>
            <input
              className={styles.input} value={values.healthPoints} name='healthPoints' onChange={handleOnChange} type="text" placeholder='Health Points'>
            </input>
            <p className={styles.error}>{errors.healthPoints}</p>
          </div>

          <div>
            <label className={styles.label} htmlFor=""> Attack:</label>
            <input
              className={styles.input} value={values.attack} name='attack' onChange={handleOnChange} type="text" placeholder='Attack'>
            </input>
            <p className={styles.error}>{errors.attack}</p>
          </div>

          <div>
            <label className={styles.label} htmlFor=""> Defense:</label>
            <input
              className={styles.input} value={values.defense} name='defense' onChange={handleOnChange} type="text" placeholder='Defense'>
            </input>
            <p className={styles.error}>{errors.defense}</p>
          </div>

          <div>
            <label className={styles.label} htmlFor=""> Speed:</label>
            <input
              className={styles.input} value={values.speed} name='speed' onChange={handleOnChange} type="text" placeholder='Speed'>
            </input>
            <p className={styles.error}>{errors.speed}</p>
          </div>

          <div>
            <label className={styles.label} htmlFor=""> Height:</label>
            <input
              className={styles.input} value={values.height} name='height' onChange={handleOnChange} type="text" placeholder='Height'>
            </input>
            <p className={styles.error}>{errors.height}</p>
          </div>

          <div>
            <label className={styles.label} htmlFor=""> Weight:</label>
            <input
              className={styles.input} value={values.weight} name='weight' onChange={handleOnChange} type="text" placeholder='Weight'>
            </input>
            <p className={styles.error}>{errors.weight}</p>
          </div>

          <button className={styles.btn}> Create</button>

        </form>

        <div className={styles.carCtnSup}>
          
          <div className={styles.carTypes} onChange={handleType} value={values.types}>
            {types.map((type, k) => (
              <div className={styles.types} key={k}>
                <input value={type.id} type="checkbox" id="check1" />
                <img className={styles.typeImg} src={type.img} alt="" />
                <label id="check1">  {type.name.charAt(0).toUpperCase() + type.name.slice(1)} </label>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CreatePoke