<?php
// Builder.php

namespace Builder\Request;

use Builder\Request\Request;


class Builder {
    public string $url;
    public RequestType $type;
    public array $header = [];
    public array $body = [];

    public function url(string $url): Builder {
        $this->url = $url;
        return $this;
    }

    public function type(RequestType $type): Builder {
        $this->type = $type;
        return $this;
    }

    public function header(string $key, string $value): Builder {
        $this->header[$key] = $value;
        return $this;
    }

    public function body(string $key, string $value): Builder {
        $this->body[$key] = $value;
        return $this;
    }

    public function build(): Request {
        return new Request($this);
    }
}