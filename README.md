boot-progressbar
================

Custom Element for Progressbar ! similar to bootstrap progress bar !

## Demo

[Check it live!](http://nsisodiya.github.io/boot-progressbar)

## Usage
    ```html
    <boot-progressbar min="200" max="500" value="340" showStatus striped active>
    </boot-progressbar>
    ```

## Install

    ```sh
    bower install boot-progressbar
    ```
## Options

Attribute         | Options    | Default     | Description
---               | ---        | ---         | ---
`min`             | *string*   | `0`         | Minimum value of Progressbar.
`max`             | *string*   | `100`       | Maximum value of Progressbar.
`value`           | *string*   | `0`         | Get/Set Value of Progressbar.
`type`            | *string*   | `default`   | possible values are success/info/danger/warning
`striped`         | *boolean*  | `false`     | Uses a gradient to create a striped effect. Not available in IE8.
`active`          | *boolean*  | `false`     | Show animation on striped. Not available in IE8.
`showStatus`      | *boolean*  | `false`     | Show Status like 32% or 350/500
`showActualValue` | *boolean*  | `false`     | Show Status in Percentage 32% if present, else show status in text like 350/500
`intermediate`    | *boolean*  | `false`     | Show Intermediate Progress bar

