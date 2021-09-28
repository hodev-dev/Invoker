--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-1.pgdg20.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: hodev2
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.permissions OWNER TO hodev2;

--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_id_seq OWNER TO hodev2;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permissions.id;


--
-- Name: role_permission; Type: TABLE; Schema: public; Owner: hodev2
--

CREATE TABLE public.role_permission (
    id integer NOT NULL,
    role_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.role_permission OWNER TO hodev2;

--
-- Name: role_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.role_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_permission_id_seq OWNER TO hodev2;

--
-- Name: role_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.role_permission_id_seq OWNED BY public.role_permission.id;


--
-- Name: role_permission_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.role_permission_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_permission_permission_id_seq OWNER TO hodev2;

--
-- Name: role_permission_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.role_permission_permission_id_seq OWNED BY public.role_permission.permission_id;


--
-- Name: role_permission_role_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.role_permission_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_permission_role_id_seq OWNER TO hodev2;

--
-- Name: role_permission_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.role_permission_role_id_seq OWNED BY public.role_permission.role_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: hodev2
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying[] NOT NULL
);


ALTER TABLE public.roles OWNER TO hodev2;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO hodev2;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: user_role; Type: TABLE; Schema: public; Owner: hodev2
--

CREATE TABLE public.user_role (
    id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_role OWNER TO hodev2;

--
-- Name: user_role_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_role_id_seq OWNER TO hodev2;

--
-- Name: user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.user_role_id_seq OWNED BY public.user_role.id;


--
-- Name: user_role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.user_role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_role_role_id_seq OWNER TO hodev2;

--
-- Name: user_role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.user_role_role_id_seq OWNED BY public.user_role.role_id;


--
-- Name: user_role_user_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.user_role_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_role_user_id_seq OWNER TO hodev2;

--
-- Name: user_role_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.user_role_user_id_seq OWNED BY public.user_role.user_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: hodev2
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying[] NOT NULL,
    email character varying[] NOT NULL
);


ALTER TABLE public.users OWNER TO hodev2;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: hodev2
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO hodev2;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hodev2
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: role_permission id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.role_permission ALTER COLUMN id SET DEFAULT nextval('public.role_permission_id_seq'::regclass);


--
-- Name: role_permission role_id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.role_permission ALTER COLUMN role_id SET DEFAULT nextval('public.role_permission_role_id_seq'::regclass);


--
-- Name: role_permission permission_id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.role_permission ALTER COLUMN permission_id SET DEFAULT nextval('public.role_permission_permission_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: user_role id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.user_role ALTER COLUMN id SET DEFAULT nextval('public.user_role_id_seq'::regclass);


--
-- Name: user_role user_id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.user_role ALTER COLUMN user_id SET DEFAULT nextval('public.user_role_user_id_seq'::regclass);


--
-- Name: user_role role_id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.user_role ALTER COLUMN role_id SET DEFAULT nextval('public.user_role_role_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: hodev2
--

COPY public.permissions (id, name) FROM stdin;
1	{edit}
2	{update}
3	{delete}
4	{create}
5	{send}
6	{share}
\.


--
-- Data for Name: role_permission; Type: TABLE DATA; Schema: public; Owner: hodev2
--

COPY public.role_permission (id, role_id, permission_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	2	1
6	2	3
7	3	2
8	3	3
9	3	4
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: hodev2
--

COPY public.roles (id, name) FROM stdin;
1	{admin}
2	{user}
3	{editor}
4	{guest}
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: hodev2
--

COPY public.user_role (id, user_id, role_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	2	2
5	3	4
6	3	1
7	3	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hodev2
--

COPY public.users (id, name, email) FROM stdin;
1	{user1}	{user1@gmail.com}
2	{user2}	{user2@gmail.com}
3	{user3}	{user3@gmail.com}
4	{user4}	{user4@gmail.com}
5	{user5}	{user5@gmail.com}
\.


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.permission_id_seq', 6, true);


--
-- Name: role_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.role_permission_id_seq', 9, true);


--
-- Name: role_permission_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.role_permission_permission_id_seq', 1, false);


--
-- Name: role_permission_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.role_permission_role_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.roles_id_seq', 4, true);


--
-- Name: user_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.user_role_id_seq', 7, true);


--
-- Name: user_role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.user_role_role_id_seq', 1, false);


--
-- Name: user_role_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.user_role_user_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hodev2
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: permissions permission_pkey; Type: CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: role_permission role_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: role_permission permission_id; Type: FK CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT permission_id FOREIGN KEY (permission_id) REFERENCES public.permissions(id);


--
-- Name: user_role role_id; Type: FK CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: role_permission role_id; Type: FK CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: user_role user_id; Type: FK CONSTRAINT; Schema: public; Owner: hodev2
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

