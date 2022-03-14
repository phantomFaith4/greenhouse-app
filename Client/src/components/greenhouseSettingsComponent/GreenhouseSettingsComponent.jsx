import React from 'react'
import './greenhouseSettingsComponent.css';

export default function GreenhouseSettingsComponent() {
  return (
    <div className='greenhouseSettings'>
        <div className="greenhouseContainer">
            <table class="tg">
                <thead>
                <tr>
                    <th className="tg-0lax" colspan="5">Greenhouse List</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="tg-0lax">Name</td>
                    <td className="tg-0lax">Content</td>
                    <td className="tg-0lax">Description</td>
                    <td className="tg-0lax">Size</td>
                    <td className="tg-0lax"></td>
                </tr>
                <tr>
                    <td className="tg-0lax">Greenhouse 1</td>
                    <td className="tg-0lax">Paprika</td>
                    <td className="tg-0lax">Ovdje je paprika</td>
                    <td className="tg-0lax">15m2</td>
                    <td className="tg-0lax">
                        <i className="deleteIcon fa-solid fa-trash-can"></i>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <i class="fa-solid fa-circle-plus"></i>
    </div>
  )
}
