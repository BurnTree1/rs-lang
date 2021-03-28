import React from 'react'
import cosmo_2 from '../../../../assets/image/cosmo_2.png';
import cosmo_3 from '../../../../assets/image/cosmo_3.png';
import cosmo_4 from '../../../../assets/image/cosmo_4.png';
import cosmo_1 from '../../../../assets/image/cosmo_1.png';
import styles from './Spacemen.module.scss'

export const Spacemen = () => {
    const cosmoIcons = [cosmo_1, cosmo_2, cosmo_3, cosmo_4]
    return (
        <div className={styles.cosmo__icons}>
            {cosmoIcons.map(icon => <img key={icon} src={icon} alt="cosmo-icon" className={styles.cosmo__icon} />)}
        </div>
    )
}