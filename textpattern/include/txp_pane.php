<?php

/*
 * Textpattern Content Management System
 * http://textpattern.com
 *
 * Copyright (C) 2015 The Textpattern Development Team
 *
 * This file is part of Textpattern.
 *
 * Textpattern is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, version 2.
 *
 * Textpattern is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Textpattern. If not, see <http://www.gnu.org/licenses/>.
 */

if (!defined('txpinterface')) {
    die('txpinterface is undefined.');
}

/**
 * Handles pane states.
 *
 * @package Admin\Pane
 */

class Textpattern_Admin_Pane
{
    /**
     * Constructor.
     */

    public function __construct()
    {
        global $step;

        $steps = array(
            'visible' => true,
        );

        if ($step && bouncer($step, $steps) && has_privs(ps('origin'))) {
            $this->$step();
        }
    }

    /**
     * Validates a token.
     *
     * @return bool
     */

    protected function valid_token()
    {
        $args = func_get_args();

        return ps('token') === md5(join('', $args).ps('origin').form_token().get_pref('blog_uid'));
    }

    /**
     * Saves pane visibility.
     */

    public function visible()
    {
        extract(psa(array(
            'pane',
            'visible',
            'origin',
        )));

        send_xml_response();

        if ($this->valid_token($pane) && preg_match('/^[a-z0-9_-]+$/i', $pane)) {
            set_pref("pane_{$pane}_visible", (int) ($visible === 'true'), $origin, PREF_HIDDEN, 'yesnoradio', 0, PREF_PRIVATE);

            return;
        }

        trigger_error('invalid_pane', E_USER_WARNING);
    }
}

new Textpattern_Admin_Pane();
