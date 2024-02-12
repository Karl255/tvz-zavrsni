--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Ubuntu 16.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 16.1 (Ubuntu 16.1-1.pgdg20.04+1)

-- Started on 2024-02-12 23:16:04 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3359 (class 1262 OID 16399)
-- Name: tvz-njp-projekt; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "tvz-njp-projekt" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';


ALTER DATABASE "tvz-njp-projekt" OWNER TO postgres;

\connect -reuse-previous=on "dbname='tvz-njp-projekt'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16865)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    id integer NOT NULL,
    name character varying(50),
    type character varying(20) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16863)
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_id_seq OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 217
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- TOC entry 218 (class 1259 OID 16864)
-- Name: account_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_user_id_seq OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 218
-- Name: account_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_user_id_seq OWNED BY public.account.user_id;


--
-- TOC entry 225 (class 1259 OID 16893)
-- Name: label; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.label (
    id integer NOT NULL,
    name character varying(32),
    user_id integer NOT NULL
);


ALTER TABLE public.label OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16891)
-- Name: label_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.label_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.label_id_seq OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 223
-- Name: label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.label_id_seq OWNED BY public.label.id;


--
-- TOC entry 224 (class 1259 OID 16892)
-- Name: label_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.label_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.label_user_id_seq OWNER TO postgres;

--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 224
-- Name: label_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.label_user_id_seq OWNED BY public.label.user_id;


--
-- TOC entry 222 (class 1259 OID 16879)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    amount numeric(20,2) NOT NULL,
    description character varying(128) NOT NULL,
    date date NOT NULL,
    account_id integer NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16878)
-- Name: transaction_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_account_id_seq OWNER TO postgres;

--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 221
-- Name: transaction_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_account_id_seq OWNED BY public.transaction.account_id;


--
-- TOC entry 220 (class 1259 OID 16877)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_id_seq OWNER TO postgres;

--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 220
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- TOC entry 228 (class 1259 OID 16907)
-- Name: transaction_label; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_label (
    transaction_id integer NOT NULL,
    label_id integer NOT NULL
);


ALTER TABLE public.transaction_label OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16906)
-- Name: transaction_label_label_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_label_label_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_label_label_id_seq OWNER TO postgres;

--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 227
-- Name: transaction_label_label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_label_label_id_seq OWNED BY public.transaction_label.label_id;


--
-- TOC entry 226 (class 1259 OID 16905)
-- Name: transaction_label_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_label_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_label_transaction_id_seq OWNER TO postgres;

--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 226
-- Name: transaction_label_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_label_transaction_id_seq OWNED BY public.transaction_label.transaction_id;


--
-- TOC entry 216 (class 1259 OID 16857)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    password_hash character(128) NOT NULL,
    is_admin boolean NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16856)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 215
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 3174 (class 2604 OID 16868)
-- Name: account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- TOC entry 3175 (class 2604 OID 16869)
-- Name: account user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account ALTER COLUMN user_id SET DEFAULT nextval('public.account_user_id_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 16896)
-- Name: label id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.label ALTER COLUMN id SET DEFAULT nextval('public.label_id_seq'::regclass);


--
-- TOC entry 3179 (class 2604 OID 16897)
-- Name: label user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.label ALTER COLUMN user_id SET DEFAULT nextval('public.label_user_id_seq'::regclass);


--
-- TOC entry 3176 (class 2604 OID 16882)
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- TOC entry 3177 (class 2604 OID 16883)
-- Name: transaction account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction ALTER COLUMN account_id SET DEFAULT nextval('public.transaction_account_id_seq'::regclass);


--
-- TOC entry 3180 (class 2604 OID 16910)
-- Name: transaction_label transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_label ALTER COLUMN transaction_id SET DEFAULT nextval('public.transaction_label_transaction_id_seq'::regclass);


--
-- TOC entry 3181 (class 2604 OID 16911)
-- Name: transaction_label label_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_label ALTER COLUMN label_id SET DEFAULT nextval('public.transaction_label_label_id_seq'::regclass);


--
-- TOC entry 3173 (class 2604 OID 16860)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3344 (class 0 OID 16865)
-- Dependencies: 219
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account VALUES (1, 'asdfasdf', 'CHECKING', 3);
INSERT INTO public.account VALUES (2, 'Žiro račun', 'CHECKING', 4);
INSERT INTO public.account VALUES (3, 'Štednja', 'SAVING', 4);


--
-- TOC entry 3350 (class 0 OID 16893)
-- Dependencies: 225
-- Data for Name: label; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.label VALUES (1, 'Expense', 3);
INSERT INTO public.label VALUES (2, 'Earnings', 3);
INSERT INTO public.label VALUES (3, 'Gift', 3);
INSERT INTO public.label VALUES (4, 'Fun', 3);
INSERT INTO public.label VALUES (5, 'Addiction', 3);
INSERT INTO public.label VALUES (6, 'Hobby', 3);
INSERT INTO public.label VALUES (7, 'Savings', 3);
INSERT INTO public.label VALUES (8, 'Plaća', 4);
INSERT INTO public.label VALUES (9, 'Zabava', 4);
INSERT INTO public.label VALUES (10, 'Hobi', 4);
INSERT INTO public.label VALUES (11, 'Ovisnost', 4);
INSERT INTO public.label VALUES (12, 'Poklon', 4);


--
-- TOC entry 3347 (class 0 OID 16879)
-- Dependencies: 222
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transaction VALUES (4, 50.00, 'Bonus', '2024-02-12', 1);
INSERT INTO public.transaction VALUES (5, -30.00, 'Ožujsko', '2024-02-12', 1);
INSERT INTO public.transaction VALUES (9, 760.00, 'Zarada 01 2024', '2024-01-15', 2);
INSERT INTO public.transaction VALUES (10, 720.00, 'Zarada 12 2023', '2023-12-15', 2);
INSERT INTO public.transaction VALUES (11, 820.00, 'Zarada 11 2023', '2023-11-15', 2);
INSERT INTO public.transaction VALUES (12, 880.00, 'Zarada 10 2023', '2023-11-15', 2);
INSERT INTO public.transaction VALUES (13, 150.00, 'Božoćna štednja', '2023-12-27', 3);
INSERT INTO public.transaction VALUES (14, -350.00, 'Poklon za Iveka', '2023-12-27', 2);
INSERT INTO public.transaction VALUES (15, -500.00, 'Novi turbo', '2024-01-19', 2);
INSERT INTO public.transaction VALUES (16, -200.00, '5 gajba žuje', '2023-12-28', 2);


--
-- TOC entry 3353 (class 0 OID 16907)
-- Dependencies: 228
-- Data for Name: transaction_label; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transaction_label VALUES (4, 2);
INSERT INTO public.transaction_label VALUES (4, 3);
INSERT INTO public.transaction_label VALUES (5, 1);
INSERT INTO public.transaction_label VALUES (5, 5);
INSERT INTO public.transaction_label VALUES (9, 8);
INSERT INTO public.transaction_label VALUES (10, 8);
INSERT INTO public.transaction_label VALUES (11, 8);
INSERT INTO public.transaction_label VALUES (12, 8);
INSERT INTO public.transaction_label VALUES (14, 12);
INSERT INTO public.transaction_label VALUES (15, 9);
INSERT INTO public.transaction_label VALUES (15, 10);
INSERT INTO public.transaction_label VALUES (16, 11);


--
-- TOC entry 3341 (class 0 OID 16857)
-- Dependencies: 216
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (1, 'admin@tvz.hr', 'da85fa81709b77d7002c9e88ffe22047dc1c03f4eec2a162953edb723650f6e6cc8eb2e741bb33f489f77e59fad7a23bcf737cdbee07644cf388adff83b0dc43', true);
INSERT INTO public."user" VALUES (3, 'asdf@asdf.asdf', 'c3053184574070770f574018a6681e549f6b92a658528ad8f14d6a66c2f9a72ba99e64175d4cc920b8be66a66c2d66756f523c2b3cd6ee3534d0fd67b96c65cd', false);
INSERT INTO public."user" VALUES (4, 'pero@tzv.hr', '5a9d2a0bd5a244acae9c6ebc834c732761f4a71b54dda60c09fcbafb18ad94d45358295b41320db5e6ca48bd74e69b990b56d185594b43f8cb1c751a08e9bde5', false);


--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 217
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_id_seq', 3, true);


--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 218
-- Name: account_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_user_id_seq', 1, false);


--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 223
-- Name: label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.label_id_seq', 12, true);


--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 224
-- Name: label_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.label_user_id_seq', 1, false);


--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 221
-- Name: transaction_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_account_id_seq', 1, false);


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 220
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 16, true);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 227
-- Name: transaction_label_label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_label_label_id_seq', 1, false);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 226
-- Name: transaction_label_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_label_transaction_id_seq', 1, false);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 215
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- TOC entry 3185 (class 2606 OID 16871)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 16899)
-- Name: label label_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.label
    ADD CONSTRAINT label_pkey PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 16913)
-- Name: transaction_label transaction_label_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_label
    ADD CONSTRAINT transaction_label_pkey PRIMARY KEY (transaction_id, label_id);


--
-- TOC entry 3187 (class 2606 OID 16885)
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- TOC entry 3183 (class 2606 OID 16862)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3192 (class 2606 OID 16872)
-- Name: account account_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3194 (class 2606 OID 16900)
-- Name: label label_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.label
    ADD CONSTRAINT label_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3193 (class 2606 OID 16886)
-- Name: transaction transaction_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- TOC entry 3195 (class 2606 OID 16919)
-- Name: transaction_label transaction_label_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_label
    ADD CONSTRAINT transaction_label_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.label(id);


--
-- TOC entry 3196 (class 2606 OID 16914)
-- Name: transaction_label transaction_label_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_label
    ADD CONSTRAINT transaction_label_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transaction(id);


-- Completed on 2024-02-12 23:16:04 CET

--
-- PostgreSQL database dump complete
--

